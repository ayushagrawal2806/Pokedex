import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
        <Oval
            visible={true}
            height="80"
            width="80"
            color="white"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
  )
}

export default Loader;