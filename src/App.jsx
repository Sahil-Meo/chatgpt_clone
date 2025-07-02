import { useState } from 'react'
import './App.css'
import user from './assets/user.png'
import bot from './assets/bot.png'
import send from './assets/send.svg'
import loadingIcon from './assets/loader.svg'


function App() {

  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])

  const onSubmit = () => {
    if (input.trim === '') return;
    updatePosts(input)
    setInput('')
  }

  const updatePosts = (posts) => {
    setPosts(prev => [...prev, { type: 'bot', posts }])
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (input.trim === '') return;
      updatePosts(input)
      setInput('')
    }

  }

  return (
    <>
      <div className="main-chatgpt w-7xl mx-auto h-[100vh]">
        <section className="chat-container">
          <div className="layout flex flex-col items-start justify-items-start my-5 gap-5">

            {posts?.map((post, index) => (
              <div key={index} className="chat-bubble flex items-center justify-center gap-2">
                <div className="avatar flex">
                  <img className={`w-10 p-2 rounded-full ${post.type === "bot" || post.type === "loading" ? 'bg-blue-500' : 'bg-gray-100'} `} src={`${post.type === "bot" || post.type === "loading" ? bot : user}`} alt="" />
                </div>
                {post.type === 'loading' ? (
                  <div className="loader">
                    <img src={loadingIcon} alt="" />
                  </div>
                ) : (
                  <div className="post bg-gray-500 text-white p-2 px-4 rounded-3xl">{post.posts}</div>
                )}
              </div>
            ))}

          </div>
        </section>

        <footer className='flex items-center justify-center'>
          <div className="fixed bottom-0 w-full bg-gray-500 p-4">
            <div className="max-w-5xl mx-auto flex items-center relative">
              <input
                onKeyUpCapture={onKeyUp}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="w-full p-3 px-4 rounded-4xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => onSubmit()}
                className=" right-0 absolute px-6 pr-4 p-1 mr-1 bg-blue-600 hover:bg-blue-700 text-white rounded-4xl  transition"
              >
                <img className='w-9' src={send} alt="" />
              </button>
            </div>
          </div>
        </footer>
      </div>

    </>
  )
}

export default App
