import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Container from '../components/container';
import Favorites from '../screens/favorites';
import Home from '../screens/home';
import Notebook from '../screens/notebook';
import Notebooks from '../screens/notebooks';
import { ColoredNotes } from '../screens/notes/colored';
import { Monographs } from '../screens/notes/monographs';
import { TaggedNotes } from '../screens/notes/tagged';
import { TopicNotes } from '../screens/notes/topic-notes';
import { Search } from '../screens/search';
import Settings from '../screens/settings';
import Tags from '../screens/tags';
import Trash from '../screens/trash';
import { eSendEvent } from '../services/event-manager';
import SettingsService from '../services/settings';
import useNavigationStore from '../stores/use-navigation-store';
import { useSelectionStore } from '../stores/use-selection-store';
import { useThemeStore } from '../stores/use-theme-store';
import { history } from '../utils';
import { rootNavigatorRef } from '../utils/global-refs';
import { hideAllTooltips } from '../utils/hooks/use-tooltip';
const NativeStack = createNativeStackNavigator();
const Tabs = React.memo(
  () => {
    const colors = useThemeStore(state => state.colors);
    const homepage = SettingsService.get().homepage;
    React.useEffect(() => {
      setTimeout(() => {
        useNavigationStore.getState().update({ name: homepage });
      }, 1000);
    }, []);

    return (
      <NativeStack.Navigator
        tabBar={() => null}
        initialRouteName={homepage}
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          lazy: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: colors.bg
          }
        }}
      >
        <NativeStack.Screen name="Notes" component={Home} />
        <NativeStack.Screen name="Notebooks" component={Notebooks} />
        <NativeStack.Screen options={{ lazy: true }} name="Favorites" component={Favorites} />
        <NativeStack.Screen options={{ lazy: true }} name="Trash" component={Trash} />
        <NativeStack.Screen options={{ lazy: true }} name="Tags" component={Tags} />
        <NativeStack.Screen name="Settings" component={Settings} />
        <NativeStack.Screen options={{ lazy: true }} name="TaggedNotes" component={TaggedNotes} />
        <NativeStack.Screen options={{ lazy: true }} name="TopicNotes" component={TopicNotes} />
        <NativeStack.Screen options={{ lazy: true }} name="ColoredNotes" component={ColoredNotes} />
        <NativeStack.Screen options={{ lazy: true }} name="Monographs" component={Monographs} />
        <NativeStack.Screen options={{ lazy: true }} name="Notebook" component={Notebook} />
        <NativeStack.Screen options={{ lazy: true }} name="Search" component={Search} />
      </NativeStack.Navigator>
    );
  },
  () => true
);

export const NavigationStack = React.memo(
  () => {
    const clearSelection = useSelectionStore(state => state.clearSelection);

    const onStateChange = React.useCallback(() => {
      if (history.selectionMode) {
        clearSelection(true);
      }
      hideAllTooltips();
      eSendEvent('navigate');
    });

    return (
      <Container>
        <NavigationContainer onStateChange={onStateChange} ref={rootNavigatorRef}>
          <Tabs />
        </NavigationContainer>
      </Container>
    );
  },
  () => true
);
