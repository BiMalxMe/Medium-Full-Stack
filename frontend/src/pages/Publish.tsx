import { Appbar } from "../components/Appbar"


export const Publish=()=>{
    return <div>
        <Appbar />
                    <div className="flex justify-center pt-7 ">
                    <div className="max-w-screen-lg w-full ">
                        <input id="message"  className="block p-2.5 w-full text-sm text-gray-900
                        bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                        focus:border-blue-500" placeholder="Enter the title here"></input>
             </div> 
                     </div>
                     <div>
                <Textarea />
             </div>
        </div>
}
function Textarea(){
    return <div>
 <div className="flex  justify-center">
    <div></div>
            <textarea rows={7} className=" max-w-screen-lg w-full block p-2.5 text-sm text-gray-900
            bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
            focus:border-blue-500 mt-4
            " placeholder="Enter Description Here..."></textarea>
</div>
        <div className="  max-w-screen-lg w-full block justify-center bg-red-200 l " >
        w-fullss
         </div>
    </div>
}