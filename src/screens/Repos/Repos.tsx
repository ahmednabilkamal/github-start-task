import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Loader, RepoItem } from '../../components';
import { useFetchRepos } from '../../hooks/useFetchRepos';
import { useTheme } from '../../hooks/useTheme';

const Repos = () => {
  const { data, isLoading, error } = useFetchRepos();
  const { colors } = useTheme();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RepoItem repo={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export { Repos };
