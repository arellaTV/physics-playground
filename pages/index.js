import Link from 'next/link';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Table of Contents:</h1>
                <ul>
                    <li><Link href="/examples/basic-rendering"><a>basic rendering</a></Link></li>
                    <li><Link href="/examples/matter-js"><a>matter-js</a></Link></li>
                </ul>
            </div>
        )
    }
}

export default App;