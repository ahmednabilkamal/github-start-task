import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, RepoItem } from '../../components';
import { useFetchRepos } from '../../hooks/useFetchRepos';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../redux/reducers';
import { setTop, setLanguage } from '../../redux/actions/action';
import { languageOptions, topOptions } from '../../constants';

const Repos = () => {
  const dispatch = useDispatch();
  const { top, language } = useSelector((state: RootState) => state.app);
  const { data, isLoading, error } = useFetchRepos();
  const { colors } = useTheme();
  const themeMode = useSelector((state: RootState) => state.theme.theme);
  const isLight = themeMode === 'light';

  if (isLoading) return <Loader />;
  if (error) return <Loader />;

  const baseTextColor = isLight ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filterSection}>
        <Text style={[styles.label, { color: baseTextColor }]}>Show top:</Text>

        <View style={styles.buttonRow}>
          {topOptions.map(value => {
            const isActive = top === value;
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.cardBackground || '#ffffff',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => dispatch(setTop(value))}
              >
                <Text
                  style={{
                    color: isActive ? '#fff' : baseTextColor,
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

      <View style={styles.filterSection}>
        <Text style={[styles.label, { color: baseTextColor }]}>Language:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonRow}
        >
          {languageOptions.map(lang => {
            const isActive = language === lang;
            return (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.cardBackground || '#eee',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => dispatch(setLanguage(lang))}
              >
                <Text
                  style={{
                    color: isActive ? '#fff' : baseTextColor,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
  container: {
    flex: 1,
    padding: 10,
  },
  filterSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
});

export { Repos };
