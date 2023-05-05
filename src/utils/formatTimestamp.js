// Converts seconds to timestamp: hh:mm:ss
// Choose to exclude hours or minutes if they are 0

export default function formatTimeStamp(
    totalSeconds,
    minimumBulksToDisplay = 1
) {
    // Add a "0" if only one integer
    // Round away converted from milliseconds
    const seconds = String(Math.round(totalSeconds % 60)).padStart(2, "0");
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");

    const formatedTimeStamp = [hours, minutes, seconds]
        .filter((ele, i) => {
            return !(+ele <= 0 && minimumBulksToDisplay + i < 3);
        })
        .join(":");

    return formatedTimeStamp;
}