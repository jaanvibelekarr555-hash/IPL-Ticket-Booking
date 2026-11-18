
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

import "./App.css";

function App() {
  const [selectedTeam, setSelectedTeam] = useState("All");

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "20 May 2026",
      venue: "Bengaluru"
    },
    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "21 May 2026",
      venue: "Mumbai"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "RR",
      date: "22 May 2026",
      venue: "Hyderabad"
    },
    {
      id: 4,
      team1: "GT",
      team2: "DC",
      date: "23 May 2026",
      venue: "Ahmedabad"
    },
    {
      id: 5,
      team1: "PBKS",
      team2: "LSG",
      date: "24 May 2026",
      venue: "Chandigarh"
    }
  ];

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter(
          (match) =>
            match.team1 === selectedTeam ||
            match.team2 === selectedTeam
        );

  return (
    <>
      <Navbar />

      <Hero />

      <section className="matches-section" id="matches">
        <h2>Upcoming IPL Matches</h2>

        <label htmlFor="team-filter">Select Team: </label>

        <select
          id="team-filter"
          value={selectedTeam}
          onChange={(event) => setSelectedTeam(event.target.value)}
        >
          <option value="All">All Teams</option>
          <option value="RCB">RCB</option>
          <option value="CSK">CSK</option>
          <option value="MI">MI</option>
          <option value="KKR">KKR</option>
          <option value="SRH">SRH</option>
          <option value="RR">RR</option>
          <option value="GT">GT</option>
          <option value="DC">DC</option>
          <option value="PBKS">PBKS</option>
          <option value="LSG">LSG</option>
        </select>

        <div className="match-container">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
            />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <p>No matches found.</p>
        )}
      </section>

      <section className="about-section" id="about">
        <h2>About IPL</h2>
        <p>
          The Indian Premier League is a professional T20 cricket
          tournament featuring teams from across India.
        </p>
      </section>

      <section className="guidelines-section" id="guidelines">
        <h2>Booking Guidelines</h2>
        <p>Book your tickets early.</p>
        <p>Carry a valid ticket to the stadium.</p>
        <p>Follow stadium security instructions.</p>
      </section>

      <footer>
        <p>© 2026 IPL Ticket Booking. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
