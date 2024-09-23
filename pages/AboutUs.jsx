const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
    
    return (
        <section id="about-us">
            <h2>About Miss Books</h2>
            <p>Miss Books is your one-stop shop for all your literary needs. We're passionate about bringing the joy of reading to everyone, regardless of genre or preference. Whether you're a seasoned bibliophile or just starting your literary journey, we have something for you.</p>
            
            <div className="about-image">
                <img src="images/bookshelf.jpg" alt="Image of a bookshelf filled with colorful books" />
            </div>
            
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
                {/* <Link to="/about/more">Learn More About Us</Link> */}
                <Link to="/about/team">About Team</Link>
                <Link to="/about/goal">About Goal</Link>
            </div>

            <Outlet />
        </section>
    )
}