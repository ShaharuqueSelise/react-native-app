import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('Romance')
  const {
    data: movies = [],
    isPending,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), true);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-black flex-1 flex justify-center items-center">
        <Text className="text-white font-bold">Coming Soon...</Text>
      </SafeAreaView >
    </SafeAreaProvider>
  )
}

export default Search