export default function Profile() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="bg-white rounded-lg p-2">
          <div className="flex flex-col sm:flex-row items-center gap-6 border border-gray-100 p-4 rounded-xl">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Eliana Garcia"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Artemi Baburin
              </h1>
              <p className="text-lg text-red-600 font-medium mb-4">
                Graphic Designer & Web Developer
              </p>

              <div className="flex justify-center sm:justify-start gap-6 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Pins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">18</div>
                  <div className="text-sm text-gray-600">Boards</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">1.2k</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">342</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700">
                  Follow
                </button>
                <button className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2">
          <div className="gap-6 border border-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 mb-4">
              I am a seasoned graphic designer with over 14 years of experience
              in creating visually appealing and user-centric designs. My
              expertise spans across UI design, design systems, and custom
              illustrations.
            </p>
            <p className="text-gray-700">
              Currently, I work remotely for Notion, where I design template
              UIs, convert them into HTML and CSS, and provide comprehensive
              support to our users.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2">
          <div className="gap-6 border border-gray-100 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Email:</span>
                <a
                  href="mailto:elianagarcia997@about.me"
                  className="text-red-600 hover:text-red-700"
                >
                  elianagarcia997@about.me
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Twitter:</span>
                <a href="#" className="text-red-600 hover:text-red-700">
                  @elianagarcia997
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2">
          <div className="gap-6 border border-gray-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Boards</h2>
              <button className="text-red-600 hover:text-red-700 font-medium">
                View all
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((board) => (
                <div key={board} className="cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        1500000000000 + board
                      }?w=400&h=400&fit=crop&auto=format`}
                      alt={`Board ${board}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">
                    Design Inspiration {board}
                  </h3>
                  <p className="text-sm text-gray-600">{20 + board} pins</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
