import React from 'react'
import GroupTestCategoryComp from '../Components/GroupTestCategoryComp'
import GroupTestSubTestComp from '../Components/GroupTestSubTestComp'
import GroupTestCombinationalCategoryComp from '../Components/GroupTestCombinationalCategoryComp'

const TestManagementPage = () => {
  return (
    <>
    <div>TestManagementPage</div>
    <GroupTestSubTestComp />
    <GroupTestCategoryComp />
    <GroupTestCombinationalCategoryComp />
    
    </>

  )
}

export default TestManagementPage