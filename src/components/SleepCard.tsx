export const SleepCard = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Sleep Date</h2>
        <ul>
          <li>Time to wake up</li>
          <li>Or time you went to bed</li>
          <li>Calculated time to sleep</li>
        </ul>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Details</button>
        </div>
      </div>
    </div>
  );
};

export default SleepCard;



