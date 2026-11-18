
function MatchCard({ team1, team2, date, venue }) {
  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>

      <p><strong>Date:</strong> {date}</p>

      <p><strong>Venue:</strong> {venue}</p>

      <button>Book Tickets</button>
    </div>
  );
}

export default MatchCard;
