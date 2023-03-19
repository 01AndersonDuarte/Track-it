import { ThreeDots } from "react-loader-spinner";
import { TailSpin } from "react-loader-spinner";

export function Loading() {
    return (
        <ThreeDots
            height="20"
            width="20"
            radius="6"
            color="black"
            ariaLabel="loading"
        // wrapperStyle
        // wrapperClass
        />);
}
export function LoadingCircle() {
    return (
        <TailSpin
            height="60"
            width="60"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            // wrapperStyle={{}}
            // wrapperClass=""
            visible={true}
        />
    );
}