import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, View, Text, FlatList } from 'react-native'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'expo-router'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'


export default function Index() {

  const router = useRouter()
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError } =
    useFetch(() => fetchMovies(
      { query: '' }))

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' />
      <ScrollView 
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
      <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        {moviesLoading ? (
          <ActivityIndicator 
            size="large" 
            color="#0000ff" 
            className='mt-10 self-center' />
        )
       : moviesError ? (
          <Text>{moviesError?.message} </Text>
        )
       : (
          <View className='flex-1 mt-5'>
            <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
            <>
              <Text className='text-lg text-white font-bold mt-5 mb-3'>Latest Movies </Text>

            <FlatList
              // data={movies?.result}
              data={[{title: "Star wars", id: 1}, {title: "Drishyam 2", id: 2}, {title: "Avengers 3", id: 3}, {title: "Housefull 4", id: 4}, {title: "Border 5", id: 5}, {title: "Kesari Jallianwala Bagh 2", id: 6}, {title: "Movie 7", id: 7}, {title: "Movie 8", id: 8}, {title: "Movie 9", id: 9}, {title: "Movie 10", id: 10}]}
              scrollEnabled={false}
              renderItem={({item})=>(
                <Text className='text-white text-sm'>{item.title}</Text>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{ 
                justifyContent: "flex-start",
                gap:20,
                paddingRight:5,
                marginBottom: 10
              }}
              className='mt-2 pb-32'
            />

            </>
          </View>
        )}

      </ScrollView>

    </View>
  )
}
