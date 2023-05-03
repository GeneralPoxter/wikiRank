import Input from '../components/input.js'
import Output from '../components/output.js'
import Header from '../components/header.js'

export default function Home() {
    return (
        <div className='bg-[#1e1e2e]'>
            <Header></Header>
            <Input></Input>
            <Output></Output>
        </div>
    );
}