// import { Link } from "react-router-dom";

// export default function Platforms({ platforms }) {
//     return (
//         <>
//             <div className="dropdown" >
//                 <button className="btn py-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Platforms
//                 </button>
//                 <ul className="dropdown-menu" style={{ 'height': '300px', 'overflowY': 'scroll' }}>
//                     {platforms.map((platform) => (
//                         <li key={platform.id}>
//                             <Link className="dropdown-item" to={`/games/${platform.slug}`}>
//                                 {platform.name}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </>
//     )
// }