import Input from './input.js'
import Output from './output.js'

export default function Home() {
    return (
        <div className='bg-[#1e1e2e]'>
            <div className='bg-[#181825] mx-[5%] my-[2%] text-[#cdd6f4] text-center p-8'>
                <h1 className='font-bold text-[400%] w-[80%] ml-auto mr-auto'>SwapWikiMachine</h1>
                <p className='m-2'>Check out the — <b>collapses and dies</b></p>
            </div>
            <Input></Input>
            <Output></Output>
        </div>
    );
}