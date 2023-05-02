import About from './query_input.js'
import Output from './output.js'
import Script from 'next/script'

const Home = () => {
  return (
    <div className='text-center bg-gradient-to-r from-blue-900 to-purple-900'>
      <Script src="model.js" />
      <div className='relative top-[10px] mb-10 text-blue-200 p-3 w-[50%] 
      ml-auto mr-auto bg-black bg-opacity-60 shadow-lg shadow-black'>
        <h1 className='font-bold text-[400%] w-[80%] ml-auto mr-auto'>
          the best search engine ever
        </h1>
        <p className='mt-2'>Our existence as a human species was a gift by God!</p>
        <br></br>
        <img src='images/jason.jpg' className='ml-auto mr-auto max-w-[400%] transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white'
        alt='our beloved founder'/>
        <p className='text-1xl'>our beloved founder</p>
      </div>
      <About></About>
      <Output content={['hamburger', 'cheeseburger', 'big mac', 'whopper']}></Output>
      <br></br>
    </div>
  )
}

export default Home;