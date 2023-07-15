import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

const BookmarkBtn = ({ movie, handleBookmarkData, inBookmark }) => {
    return (
        <button
          onClick={() => handleBookmarkData(movie)}
          className="flex items-center justify-center absolute right-4 top-4 bg-gray-900 bg-opacity-50 rounded-full w-7 h-7 text-xl"
        >
          {inBookmark ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
    );
}

export default BookmarkBtn;