import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-[#4cbb17]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-[#4cbb17] mb-4">Beetlejuice's Guide to the 1850 Liberal Revolutions</h1>
        <Image
          className="invert"
          src="/beetlejuice.png"
          alt="Beetlejuice"
          width={180}
          height={180}
          priority
        />
        <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]" style={{ listStyleType: 'lower-roman' }}>
          <li className="mb-2">
            The 1850 Liberal Revolutions were a series of uprisings across Europe.
          </li>
          <li className="mb-2">
            They were sparked by discontent with conservative monarchies and a desire for liberal reforms.
          </li>
          <li className="mb-2">
            Key countries involved included France, Germany, Italy, and the Austrian Empire.
          </li>
          <li>The revolutions ultimately failed but laid groundwork for future changes.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-[#4cbb17] transition-colors flex items-center justify-center bg-[#4cbb17] text-black gap-2 hover:bg-black hover:text-[#4cbb17] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://en.wikipedia.org/wiki/Revolutions_of_1848"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More About the Revolutions
          </a>
          <a
            className="rounded-full border border-solid border-[#4cbb17] transition-colors flex items-center justify-center hover:bg-[#4cbb17] hover:text-black text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://en.wikipedia.org/wiki/Beetlejuice"
            target="_blank"
            rel="noopener noreferrer"
          >
            Who is Beetlejuice?
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/French_Revolution_of_1848"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/french-flag.png"
            alt="French Flag"
            width={16}
            height={16}
          />
          French Revolution of 1848
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/German_revolutions_of_1848%E2%80%931849"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/german-flag.png"
            alt="German Flag"
            width={16}
            height={16}
          />
          German Revolutions
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/Revolutions_of_1848_in_the_Italian_states"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/italian-flag.png"
            alt="Italian Flag"
            width={16}
            height={16}
          />
          Italian Revolutions →
        </a>
      </footer>
    </div>
  );
}
