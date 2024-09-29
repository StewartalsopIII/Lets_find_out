import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'

export async function POST() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: userId }, { onConflict: 'user_id' })
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error managing user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}