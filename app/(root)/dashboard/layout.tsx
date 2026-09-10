import React from 'react'

const layout = ({children,todayemission,averageemission,totalemission,recordedactivities,linechart,piechart,recentactivities,recommendations}:any) => {
  return (
    <div>
    {children}
    <section className='flex flex-col md:flex-row items-center justify-center'>
        {todayemission}
        {averageemission}
        {totalemission}
        {recordedactivities}
    </section>
    <div className='flex flex-col md:flex-row gap-2 p-2 items-center justify-center'>
      {linechart}
      {piechart}
    </div>
    <div className='p-2 flex gap-2 flex-col md:flex-row'>
      {recentactivities}
      {recommendations}
    </div>
    
    </div>
  )
}

export default layout