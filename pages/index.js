import Head from 'next/head'
import Header from '../components/header.js'
import Input from '../components/input.js'

export default function Home() {
    return (
        <div className='bg-[#1e1e2e]'>
            <Head>
                <title>wikiRank</title>
            </Head>
            <Header></Header>
            <Input></Input>
        </div>
    );
}