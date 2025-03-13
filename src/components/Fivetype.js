import React from 'react'
import Anime from "../List/Anime.png"
import SuperHero from "../List/SuperHero.png"
import Cartoon from "../List/Cartoon.png"
import Slogan from "../List/Slogan.png"
import Funny from "..//List/Funny.png"

const Fivetype = () => {
    const type = [
        { id:'1',image:Anime,name:'Anime'},
        { id:'1',image:SuperHero,name:'SuperHero'},
        { id:'1',image:Cartoon,name:'Cartoon'},
        { id:'1',image:Slogan,name:'Slogan'},
        { id:'1',image:Funny,name:'Funny'}
    ]
  return (
    <div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-4">
            {type.map((item) => (
                <div key={item.id} className="p-4 rounded-lg  text-center">
                    <img src={item.image} alt={item.name} className="w-[200px] h-[200px] mx-auto" />
                    <p className="mt-2 font-[400] text-[24px] text-[Arimo]">{item.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Fivetype
