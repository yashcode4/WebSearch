import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import { useResultContext } from '../contexts/ResultContextProvider';

import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();

  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/search') {
        getResults(`/websearch`)
      } else if (location.pathname === '/images') {
        getResults(`/imagesearch`)
      } else if (location.pathname === '/videos') {
        getResults(`/videosearch`)
      }
    }
    // eslint-disable-next-line 
  }, [searchTerm, location.pathname]); 


  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-wrap justify-between space-y-6 sm:px-56'>
          {results?.result?.slice(0, 50).map(({ href, title }, index) => (
            <div key={index} className='md:w-2/5 w-full'>
              <a href={href} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {href.length > 50 ? href.substring(0, 30) : href}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      )
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.result?.slice(0, 50).map(({ thumbnail, url, title }, index) => (
            <a className='sm:p-3 p-5' href={url} key={index} target='_blank' rel='noreferrer'>
              <img src={thumbnail} alt={title} loading='lazy' style={{ width: 200, height: 200 }} />
              <p className='w-36 break-words text-sm mt-2'>
                {title}
              </p>
            </a>
          ))}
        </div>
      )
    case '/videos':
      return (
        <div className='flex flex-wrap justify-center'>
          {results?.result?.slice(0, 20).map((embed_url, index) => (
            <div key={index} className='p-2'>
              <ReactPlayer url={embed_url.embed_url} controls width="300px" height="175px" />
            </div>
          ))}
        </div>
      )

    default:
      return 'ERROR';
  }
}
