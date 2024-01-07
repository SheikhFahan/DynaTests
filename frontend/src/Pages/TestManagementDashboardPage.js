import React from 'react'
import GroupTestSubTestComp from '../Components/DashboardTestCategories'


const TestManagementPage = () => {
  const subTestData = {
    compName: 'Sub-Tests',
    urlEnd : 'sub_group_test',
  }
  const TestCategoryData = {
    compName: 'Test Categories',
    urlEnd : 'group_test_categories',
  }
  const TestCombinedCategoryData = {
    compName: 'Test Combinations',
    urlEnd : 'group_test_combined_categories',
  }
  return (
    <>
    <div>TestManagementPage</div>
    <GroupTestSubTestComp data = {subTestData}/>
    <GroupTestSubTestComp data = {TestCategoryData} />
    <GroupTestSubTestComp data = {TestCombinedCategoryData} />
    </>

  )
}

export default TestManagementPage 