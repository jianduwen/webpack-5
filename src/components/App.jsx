import "@/styles/app.scss";
import logo from "@/images/img-hero-referral.svg";
import Recipes from "@/components/Recipes";
const App = () => {
    return ( 
        < >
            <section className="hero"></section>
            <main>
                <section>
                    <h1>
                        Hello, React!!
                    </h1>
                    <img src={logo} width="200px" alt="" />
                </section>
            </main>
            <Recipes />
        </>
     );
}
 
export default App;