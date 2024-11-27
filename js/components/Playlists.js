'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'
const PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL'

interface Video {
  id: string
  title: string
  thumbnail: string
}

export default function Playlists() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=10&key=${API_KEY}`)
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()
      const videosData = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url
      }))

      setVideos(videosData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching the playlist:', error)
      setError('Error fetching the videos. Please try again later.')
      setLoading(false)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="my-16 px-4 relative">
      <h2 className="text-4xl font-bold mb-8 text-center text-red-800">
        Nuestras Playlists
      </h2>
      {loading ? (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex-none w-96 h-64 bg-gray-200 rounded-lg shadow-md animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <div className="relative">
            <motion.div
              ref={containerRef}
              className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide"
              whileTap={{ cursor: "grabbing" }}
            >
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className="flex-none w-96 h-64 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  whileHover={{ y: -5 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </motion.div>
              ))}
            </motion.div>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-8 h-8 text-red-800" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-8 h-8 text-red-800" />
            </button>
          </div>
        </>
      )}
    </section>
  )
}

