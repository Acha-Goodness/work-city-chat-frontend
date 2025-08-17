import { useRef, useState } from 'react';
import { sendMessages } from '@/store/chat-slice';
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { MdImage } from "react-icons/md";


const MessageInput = () => {
  const [ text, setText ] = useState("");
  const [ imagePreview, setImagePreview ] = useState(null);
  const fileInputRef = useRef(null)
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
  
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    dispatch(sendMessages({text: text.trim(), image: imagePreview}))
    .then((res) => {
      console.log(res)
      setText("");
      setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    }).catch((err) => {
        console.error("Failed to send message:", err);
    })   
  }
  
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-black
              flex items-center justify-center"
              type="button"
            >
              <RxCross2 className="size-10 text-bold text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered py-[0.3%] rounded-lg input-sm sm:input-md bg-[#9ad2ffff] text-black"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <MdImage size={20}/>
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle text-emerald-500"
          disabled={!text.trim() && !imagePreview}
        >
          <IoIosSend size={30} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;