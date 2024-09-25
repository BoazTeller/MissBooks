const { Link, Outlet, useLocation, useNavigate  } = ReactRouterDOM

export function AboutUs() {

    const location = useLocation()
    const navigate = useNavigate()

    function handleLinkChange(ev, path) {
        const currPath = location.pathname
        if (currPath === path) {
            // Took like an hour to find out you need to preventDefault !
            ev.preventDefault()
            navigate('/about')
        } 
    }

    return (
        <section className="about-us">
            <h2 className="title">About Miss Books</h2>
            <p>Miss Books is your one-stop shop for all your literary needs. We're passionate about bringing the joy of reading to everyone, regardless of genre or preference. Whether you're a seasoned bibliophile or just starting your literary journey, we have something for you.</p>
            
            <p>We offer a wide variety of books, from classic literature to the latest bestsellers. We also have a dedicated team of book lovers who are always happy to help you find the perfect read. We believe that books have the power to transport us to new worlds, teach us new things, and inspire us. Let Miss Books be your guide on your next literary adventure.</p>
            
            <div className="about-values">
                <h3>Our Values</h3>

                <ul>
                    <li>Passion for reading</li>
                    <li>Excellent customer service</li>
                    <li>Curated selection of books</li>
                    <li>Affordable prices</li>
                    <li>Commitment to the community</li>
                </ul>
            </div>

            <div className="about-links">
                <Link to="/about/team" onClick={(ev) => handleLinkChange(ev, '/about/team')}>
                    About Team
                </Link>

                <Link to="/about/goal" onClick={(ev) => handleLinkChange(ev, '/about/goal')}>
                    About Goal
                </Link>
            </div>

            <Outlet />
        </section>
    )
}