const { Link } = ReactRouterDOM

export function HomePage() {

    return (
        <section className="home-page">
            <div className="welcome-banner-wrapper">
                <h1>Welcome to MissBooks!</h1>
            </div>

            <p>Your one-stop shop for all things books.</p> 

            <Link to="/book">
                <img className="img-link img-hero" src="./assets/img/hero.png" alt="Bookshelf" />
            </Link>
        </section>
    )
}
