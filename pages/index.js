import About from './query_input.js'
import Script from 'next/script'

const Home = () => {
  return (
    <div className='text-center'>
      <Script src="model.js" />
      <h1 className='top-20 bottom-[20%] font-bold text-9xl text-green-500'>
        Ello Govna
      </h1>
      <About></About>
      <p className='text-blue-400'> bro</p>
    </div>
  )
}

export default Home;