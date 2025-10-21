import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, RepoItem } from '../../components';
import { useFetchRepos } from '../../hooks/useFetchRepos';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../redux/reducers';
import { setTop } from '../../redux/actions/action';

const Repos = () => {
  const dispatch = useDispatch();
  const { top } = useSelector((state: RootState) => state.app);
  const { data, isLoading, error } = useFetchRepos();
  const { colors } = useTheme();

  if (isLoading) return <Loader />;
  if (error) return <Loader />;

  const options = [10, 50, 100];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filterContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Show top:</Text>

        <View style={styles.buttonsContainer}>
          {options.map(value => {
            const isActive = top === value;
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isActive ? colors.primary : 'transparent',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => dispatch(setTop(value))}
              >
                <Text
                  style={{
                    color: isActive ? colors.buttonText || '#fff' : colors.text,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {`Top ${value}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <RepoItem repo={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  filterContainer: {
    flexDirection: 'column',
    marginBottom: 12,
    gap: 8,
  },
  label: { fontSize: 16, fontWeight: '600' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 20,
  },
});

export { Repos };
