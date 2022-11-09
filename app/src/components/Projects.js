import Project from "./Project"
import { Stack, Box } from "@mui/system"
import ProjectMenu from "./ProjectMenu"
import { useEffect, useState } from 'react'
import Select from "react-select"

function Projects() {
  const url = process.env.REACT_APP_BASE_URL 
  const user = localStorage.getItem("user")
  const [projects, setProjects] = useState([])
  const [updateProjects, setUpdateProjects] = useState(false)
  const [hwsets, setHwsets] = useState([])
  const [selection, setSelection] = useState(JSON.parse(localStorage.getItem('project-selection')) === null ? null : localStorage.getItem('project-selection'))

  useEffect(() => {
    fetch(`${url}projects/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects)
        setHwsets(data.hwsets)
      })
  }, [updateProjects])
  

  const renderedProjects = projects.map((project) => {
    return (
      <Project 
        key={project.ProjectID}
        project={project}
        hwsets={hwsets}
        setUpdateProjects={setUpdateProjects}
        updateProjects={updateProjects}
        >
      </Project>
    )
  })


  var authorizedProjects = projects.map((project, index) => {
    var option = {
    label: project.ProjectName + " (" + project.ProjectID + ")", value: index
    }
    return option;
  })

  authorizedProjects.unshift({label: "Display all Projects", value: null})

  if (projects.length === 0) {
    return <Box></Box>
  }

  return (
    <Box sx={{ p: 10}}>
      <Stack spacing={5}>
        <ProjectMenu></ProjectMenu>
        <Stack sx={{ border: 1, borderColor: 'black', p: 5, borderRadius: 1 }} spacing={2}>
            <Box sx={{ fontWeight: 500 }}>Projects</Box>
            <Select options={authorizedProjects} placeholder={selection !== null ? projects[selection].ProjectName : 'Display All Projects'} onChange={(choice) =>{
                if(choice.value == null){
                  localStorage.setItem('project-selection', null)
                  setSelection(null)
                }else{
                  localStorage.setItem('project-selection', choice.value)
                  setSelection(choice.value)
                }
            }}/>
            <Stack spacing={2}>
              {selection === null ? renderedProjects : renderedProjects[selection]}
            </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Projects
