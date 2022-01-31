import {useEffect, useState} from "react";

const UserDetail = ({user}) => { 
    
    const [session, loading] = useSession();
    

    return (

      <div className="bg-white block py-10 mt-20">
          <div className="max-w-2xl mx-auto">
              <div className="w-full">
                  <div className="absolute -mt-20 ml-5">
                      {/*Avatar*/}
                      <div className="bg-gray-200 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary">
                      </div>
                  </div>
              </div>
              <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
                  <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-96 text-gray-900 pb-6 pl-2">
                      {user?.name} {user.lastName}
                  </div>
                  <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-96 text-gray-900 pb-6 pl-2">
                      {user.cardId}
                  </div>
                  <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-96 text-gray-900 pb-6 pl-2">
                      {user?.email}
                  </div>
                  <div className="text-sm mt-2 text-gray-200">
                      <div className="flex flex-row ml-auto space-x-2 items-center">
                          <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-40 text-gray-900 pb-4 pl-2 text-gray-300">
                              {user?.phone}
                          </div>
                      </div>
                  </div>

                  <div className="py-5 break-all bbcode">
                      <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44 pb-6 pl-2">
                          {user?.username}
                      </div>
                      <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default UserDetail;