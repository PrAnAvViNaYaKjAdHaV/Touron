export default function TeamMember({ name, designation, image }) {
  return (
    <div className="flex flex-col items-center text-center bg-stone-500 pb-4 rounded">
      <img className=" w-32 h-36 sm:w-60 sm:h-64 mb-4 object-cover" src={image.url} alt={name} />
      <h3 className=" text-lg sm:text-xl text-stone-50 font-semibold">{name}</h3>
      <p className=" text-xs sm:text-sm text-stone-100">{designation}</p>
    </div>
  );
}
