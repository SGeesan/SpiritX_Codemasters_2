
export default function ChatModal(){
    return(
    //Main container
    <div className="w-full h-full pt-10 ">
        {/*chat bot div */}
       <div className=" rounded-lg shadow-lg w-full h-full " style={{ backgroundImage: "url(./sprinter.jpg)" }}>
        
            {/*chat bot header div*/}
            <div className="border-b-2 px-2 py-4 bg-transparent" >
                <div className="inline-flex items-center">
                   
                   <span className="ml-4 font-bold text-red-700 text-2xl" >Sprinter</span>   
                </div>
            </div>
            {/*chat bot Body div*/}
            <div className="h-80 flex flex-col w-full px-2 mb-2 mt-2 space-y-4 bg-transparent">
                {/*chat bot text div*/}
                <div className="flex flex-col items-start">
                    <span className="bg-[#E30220] px-4 py-2 text-white rounded-b-xl rounded-tl-xl mb-2 mt-2">How can I help?</span>
                </div>
                {/*chat bot user text div*/}
                <div className="flex flex-col items-end">
                    <span className="bg-black px-4 py-2 text-white mt-2 mb-2 rounded-b-xl rounded-tr-xl">Good Place For coffee</span>
                </div>
            </div>
            {/*chat bot footer div*/}
            <div className="border-t-2 flex items-center py-4 px-2">
                <input type="text" placeholder="type here..." className="flex-1 rounded-lg px-4 py-2 border-2 mr-2"/>
                <button type="submit" className="relative right-16">Send</button>
            </div>
       </div>
    </div>
    )
}