import React from "react";

function Reactions({ reactions = [] }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Mouse Click Number</th>
          <th>Reaction time</th>
        </tr>
      </thead>
      <tbody>
        {reactions.map((reaction, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{reaction.toFixed(0)}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Reactions;
