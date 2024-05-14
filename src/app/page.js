"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { PaperPlaneTilt, XCircle } from '@phosphor-icons/react/dist/ssr'
import Footer from '@/components/Footer'
import AudioPlayer from '@/components/AudioPlayer'
export default function Home() {
  const [confessions, setConfessions] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedCard,setSelectedCard] = useState('C1')
 

  useEffect(() => {
    fetchConfessions()
  }, [])

  const saus=[
    {btn:"B1",crd:"C1"},
    {btn:"B2",crd:"C2"},
    {btn:"B3",crd:"C3"},
    {btn:"B4",crd:"C4"},
    {btn:"B5",crd:"C5"},
]

const handleCardClick = (card)=>{
  setSelectedCard(card)
}


  const fetchConfessions = async () => {
    try {
      const response = await axios.get('/api/confessions')
      setConfessions(response.data.data)
    } catch (error) {
      console.error('Error fetching confessions:', error)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!name || !content) {
      alert('Nama dan pesan harus diisi!')
      return
    }
    try {
      setShowForm(false) 
      await axios.post('/api/confessions', { name, content,background:selectedCard })
      fetchConfessions()
      setName('')
      setSelectedCard('C1')
      setContent('')
    } catch (error) {
      console.error('Error adding confession:', error)
    }
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div className='border-b p-4 border-black w-full '>
          <h1 className='font-bold text-4xl'>Card Confess</h1>
        </div>
        <div className='border border-black border-t-0 border-e-0'>
          <img 
            className='w-20 p-4  aspect-square object-cover rounded-full'
            src="https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
      
      {showForm ? ( 
        <div className='flex flex-col '>

        <form  
          className='flex flex-col justify-center items-center text-center absolute z-20 w-full h-full'
          onSubmit={handleFormSubmit}
        >
          <div className={`aspect-square w-2/3 rounded flex flex-col justify-center relative bg-contain`}
            style={{ backgroundImage: `url("/${selectedCard}.png")` }} >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="masukan pesan"
              maxLength={100}
              className='resize-none self-center text-center absolute top-0 bottom-0 my-auto h-24 outline-0 bg-transparent w-full'
            ></textarea>
            <div className='absolute flex items-center right-5 bottom-5 text-black p-2 rounded'>
            <input 
              className='outline-0 rounded text-end '
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder='Masukan nama'
              maxLength={12}
              />
              </div>
          </div>
          <div>
          <button type="submit" className='my-auto ml-2 absolute top-5 right-5 text-blue-500'><PaperPlaneTilt size={32} /></button>
          <button className='absolute top-5 left-5 text-red-400' onClick={()=>setShowForm(false)}><XCircle size={32} /></button>
              </div>
        </form>
        <div className='flex absolute -bottom-3 p-4 overflow-x-scroll w-full z-50 gap-3'>
          {saus.map((sos,index)=>(
            <button 
            onClick={()=>handleCardClick(sos.crd)}
            key={index} 
            style={{ backgroundImage: `url("/${sos.btn}.png")` }} 
            className={`w-20 h-20  z-50 bg-contain ${selectedCard===sos.crd ? 'border-green-500': 'border-slate-500' }  border-4 rounded-full aspect-square`} 
            type='button'></button>
          ))}
        </div>
          </div>
      ) : (
        <div>
        <div className='flex justify-center my-4'>
        <div className='bg-[url("/add.png")] w-60 flex items-center justify-center h-44 bg-cover'>
        <button onClick={() => setShowForm(true)} className='text-sm mt-6'>Tambah <br/> Confession</button> 
        </div>
        </div>
        
        </div>
      )}
      {showForm?null:(<ul>
        {/* yang spesial spesial aja */}
        <div className='flex flex-col justify-center bg-cover text-center m-0 p-0 items-center bg-[url("/icegif-543.gif")] bg-contain'>
            <li className={` bg-cover w-2/3 aspect-square relative justify-center flex flex-col rounded my-5 shadow`}
            style={{ backgroundImage: `url("/giphy.gif")` }} >
            
              <AudioPlayer src={"/israel-babi.mp3"} />
              <div className='absolute right-5 bottom-5 flex items-center justify-center'>
                <h1 className='self-start text-sm tracking-widest my-auto mr-2 font-semibold drop-shadow'>admin</h1>
                <img
                  className='rounded-full w-7'
                  src="/gojo-satoru.gif" alt=""/>
              </div>
            </li>
          </div>
          {/* spesialnya sampe sini */}
        {confessions.map((confession) => (
          <div className='flex flex-col justify-center text-center m-0 p-0 items-center bg-[url("/bg-black.png")] bg-contain'>
            <li key={confession.id} className={` bg-contain w-2/3 aspect-square relative justify-center flex flex-col rounded my-5 shadow`}
            style={{ backgroundImage: `url("/${confession.background}.png")` }} >
            
              <p className='  '>{confession.content}</p>
              <div className='absolute right-5 bottom-5 flex items-center justify-center'>
                <h1 className='self-start text-sm tracking-widest my-auto mr-2 font-semibold drop-shadow'>{confession.name}</h1>
                <img
                  className='rounded-full w-7'
                  src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1" alt=""/>
              </div>
            </li>
          </div>
        ))}
      <Footer/>
      </ul>)}
      
    </div>
  )
}
