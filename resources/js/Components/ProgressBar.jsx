import { Progress, Typography } from "@material-tailwind/react";

export default function ProgressBar({ percent }) {
    return (
        <div className="w-full">
            <div className="mb-1 gap-4">
                <Typography color="blue-gray" variant="h6">
                    {`${percent}%`}
                </Typography>
            </div>
            <Progress value={percent} color="blue" />
        </div>
    );
}

