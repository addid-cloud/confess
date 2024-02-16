"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr'

export default function Home() {
  const [confessions, setConfessions] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchConfessions()
  }, [])

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
    try {
      await axios.post('/api/confessions', { name, content })
      fetchConfessions()
      setName('')
      setContent('')
      setShowForm(false) 
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
        <form 
          className='flex flex-col justify-center items-center text-center m-2 absolute z-20 w-full h-full'
          onSubmit={handleFormSubmit}
        >
          <div className='aspect-square w-2/3 bg-blue-200 flex flex-col justify-center relative'>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="masukan pesan"
              maxLength={100}
            ></textarea>
            <div className='absolute flex items-center right-5 bottom-5'>
            <input 
              className=''
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder='Masukan nama'
              maxLength={12}
              />
            <button type="submit" className='my-auto ml-2'><PaperPlaneTilt size={22} /></button>
              </div>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Tambah Confession</button> 
      )}
      {showForm?null:(<ul>
        {confessions.map((confession) => (
          <div className='flex flex-col justify-center text-center gap-10 items-center'>
            <li key={confession.id} className='bg-blue-200 w-2/3 aspect-square relative justify-center flex flex-col rounded my-5'>
              <p className='  '>{confession.content}</p>
              <div className='absolute right-5 bottom-5 flex items-center justify-center'>
                <h1 className='self-start text-sm tracking-widest my-auto mr-2'>{confession.name}</h1>
                <img
                  className='rounded-full w-7'
                  src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1" alt=""/>
              </div>
            </li>
          </div>
        ))}
      </ul>)}
      
    </div>
  )
}
