import Link from 'next/link';

export default function TechRadarInfo() {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-5xl">Teknoloji Radarı Nedir?</h1>
            <p className="w-9/10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores mollitia minus unde ipsa, sed aperiam temporibus commodi? Quae, quasi. Delectus, recusandae quaerat nihil quasi quisquam libero blanditiis enim doloremque consequuntur?
                Ad atque doloremque, reprehenderit in esse at aut eum perferendis nisi tempore, obcaecati, fugiat temporibus molestias similique accusantium distinctio maiores nesciunt voluptate soluta aliquid ducimus nostrum. Molestiae fuga voluptatem iure?
            </p>
            <Link href="/techRadarInfo/thsInfo">
                <span className="mt-4 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                    Daha Fazla Bilgi
                </span>
            </Link>
        </div>
    );
}
