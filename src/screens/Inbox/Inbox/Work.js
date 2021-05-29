import React, {Component} from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {Header} from 'components/header';
import {CardSection} from 'components/card';
import _ from 'lodash';

function AboutWork({data}) {
  if (_.isEmpty(data)) {
    return null;
  }
  const {
    workTitle,
    workDescription,
    workStatus,
    companyDetail,
    companyId,
    staffGroupId,
    vehicleId,
    geoObjectTrackId,
    endTime,
  } = data;
  const {companyName} = companyDetail;
  const {email, mobileNo} = companyId;
  const {groupName} = staffGroupId;
  const {plateNo} = vehicleId;
  return (
    <ScrollView>
      <Text>Company:{companyName}</Text>
      <CardSection>
        <Text>Work</Text>
        <Text>Work title: {workTitle}</Text>
        <Text>Work description:</Text>
        <Text>{workDescription}</Text>
        <Text>{endTime}</Text>
        <Text>Track list for this work:</Text>
        {geoObjectTrackId.map((t, index) => (
          <Text>{t.trackName}</Text>
        ))}
        <Text>Assigned:</Text>
        <Text>group: {groupName}</Text>
        <Text>vehicle no: {plateNo}</Text>
        <Text>Work status: {workStatus}</Text>
      </CardSection>
      <CardSection>
        <Text>ContactDetail</Text>
        <Text>email: {email}</Text>
        <Text>mobile: {mobileNo}</Text>
      </CardSection>
    </ScrollView>
  );
}

export class Work extends Component {
  componentDidMount() {
    const {route, thunkFetchWork} = this.props;
    const {workId} = route.params;
    thunkFetchWork(workId);
  }

  render() {
    const {work} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header title="Work Detail" backIconContainerStyle={{flex: 0}} />
        <AboutWork data={work} />
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(Work, 'inbox');
