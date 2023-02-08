import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Mint from "../components/Mint";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Dog Minter NFT Dapp</title>
        <meta name="description" content="Pexel NFT Dapp" />
        <link rel="icon" href="/favicon.jpg" />
        {/* <a href="https://www.freepik.com/free-vector/cute-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_24331490.htm#query=puppy%20face%20cartoon&position=33&from_view=search&track=ais">Image by catalyststuff</a> on Freepik */}
      </Head>
      <div>
       <Header />
       <Mint />
       <Footer />
      </div>
    </div>
  );
}

export default Home;