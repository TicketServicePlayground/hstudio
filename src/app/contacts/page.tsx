const ScrollCards = () => {
  const cards = [
    { id: 1, title: 'First Card', color: 'bg-blue-500' },
    { id: 2, title: 'Second Card', color: 'bg-green-500' },
    { id: 3, title: 'Third Card', color: 'bg-purple-500' },
    { id: 4, title: 'Fourth Card', color: 'bg-red-500' },
  ]

  return (
    <div className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`absolute inset-0 ${card.color} transition-all duration-700 ease-in-out`}
          >
            <div className="h-full w-full flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">{card.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation links */}
      <div className="absolute inset-0 flex flex-col">
        {cards.map((_, index) => (
          <div key={index} className="h-screen snap-start" />
        ))}
      </div>
    </div>
  )
}

export default ScrollCards
