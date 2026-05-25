"use client";

export default function Page() {
  const games = [
    {
      league: 'Champions League',
      home: 'Real Madrid',
      away: 'Manchester City',
      odd1: '2.10',
      oddx: '3.40',
      odd2: '2.90',
    },
    {
      league: 'Brasileirão Série A',
      home: 'Flamengo',
      away: 'Palmeiras',
      odd1: '1.95',
      oddx: '3.10',
      odd2: '3.60',
    },
    {
      league: 'Premier League',
      home: 'Arsenal',
      away: 'Liverpool',
      odd1: '2.45',
      oddx: '3.20',
      odd2: '2.55',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-green-500/20 bg-zinc-950 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-400 to-yellow-500 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-green-500/30">
              RS
            </div>

            <div>
              <h1 className="font-black text-xl tracking-wide text-green-400">
                REALSPORTS.TOP
              </h1>

              <p className="text-xs text-zinc-400">
                Sports Betting Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#" className="hover:text-green-400 transition">
              Ao Vivo
            </a>

            <a href="#" className="hover:text-green-400 transition">
              Futebol
            </a>

            <a href="#" className="hover:text-green-400 transition">
              Basquete
            </a>

            <a href="#" className="hover:text-green-400 transition">
              Cassino
            </a>

            <a href="#" className="hover:text-green-400 transition">
              Promoções
            </a>
          </nav>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border border-zinc-700 hover:border-green-400 transition">
              Login
            </button>

            <button className="px-5 py-2 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 transition shadow-lg shadow-green-500/30">
              Registrar
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.25),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm mb-6">
              Plataforma Premium de Apostas
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Aposte nos <span className="text-green-400">maiores jogos</span> do mundo
            </h2>

            <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
              Interface moderna inspirada nas maiores plataformas esportivas do mercado.
              Futebol, odds ao vivo, estatísticas e experiência premium.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-7 py-4 rounded-2xl bg-green-500 text-black font-black hover:bg-green-400 transition shadow-2xl shadow-green-500/30">
                Começar Agora
              </button>

              <button className="px-7 py-4 rounded-2xl border border-zinc-700 hover:border-green-400 transition">
                Ver Jogos
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-14">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
                <p className="text-3xl font-black text-green-400">+500</p>
                <p className="text-sm text-zinc-400 mt-1">Jogos Diários</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
                <p className="text-3xl font-black text-green-400">24/7</p>
                <p className="text-sm text-zinc-400 mt-1">Odds Ao Vivo</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
                <p className="text-3xl font-black text-green-400">100%</p>
                <p className="text-sm text-zinc-400 mt-1">Responsivo</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-52 h-52 bg-green-500/20 blur-3xl rounded-full"></div>

            <div className="relative bg-zinc-950 border border-green-500/20 rounded-[32px] p-6 shadow-2xl shadow-green-500/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-zinc-400 text-sm">Bilhete de Aposta</p>
                  <h3 className="text-2xl font-black">AO VIVO</h3>
                </div>

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-5 hover:border-green-500/50 transition"
                  >
                    <div className="flex items-center justify-between text-sm text-zinc-400 mb-3">
                      <span>{game.league}</span>
                      <span>Hoje</span>
                    </div>

                    <div className="space-y-2 font-semibold mb-5">
                      <div className="flex justify-between">
                        <span>{game.home}</span>
                        <span className="text-green-400">●</span>
                      </div>

                      <div className="flex justify-between">
                        <span>{game.away}</span>
                        <span className="text-red-400">●</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button className="bg-zinc-900 hover:bg-green-500 hover:text-black transition rounded-xl py-3 font-bold">
                        {game.odd1}
                      </button>

                      <button className="bg-zinc-900 hover:bg-green-500 hover:text-black transition rounded-xl py-3 font-bold">
                        {game.oddx}
                      </button>

                      <button className="bg-zinc-900 hover:bg-green-500 hover:text-black transition rounded-xl py-3 font-bold">
                        {game.odd2}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
