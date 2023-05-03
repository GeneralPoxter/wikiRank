import Input from '../components/Input.js'
import Output from '../components/output.js'
import Header from '../components/header.js'
import Bar from '../components/linkbar.js'

export default function Home() {
    return (
        <div className='bg-[#1e1e2e]'>
            <Bar></Bar>
            <Header></Header>
            <Input></Input>
            <Output></Output>
        </div>
    );
}