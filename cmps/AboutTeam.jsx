export function AboutTeam() {
  
  const teamMembers = [
      // {
      //   name: "John Doe",
      //   title: "Founder and CEO",
      //   description: "A passionate leader with a vision for Miss Books.",
      // },
      // {
      //   name: "Jane Smith",
      //   title: "Head of Marketing",
      //   description:
      //     "Leads marketing strategies to bring Miss Books to a wider audience.",
      // },
      {
        name: "Boaz Teller",
        title: "Just another wannabe Frontend Developer",
        description:
          "Still mesmerized by the good old Exercise Runner days, Boaz brings a unique perspective to the team with his passion for coding and problem-solving.",
      }
  ]

  return (
      <section className="about-team">
          <h2>Our Team</h2>
          <p>Meet the dedicated team behind Miss Books.</p>

          <ul>
              {teamMembers.map((member) => (
                  <li key={member.name}>
                      <h3>{member.name}</h3>
                      <p>{member.title}</p>
                      <p>{member.description}</p>
                  </li>
              ))}
          </ul>
      </section>
  )
}