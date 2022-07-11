import React, { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  ThemeProvider,
  Theme,
  Authenticator,
  Button,
  Heading,
  View,
  Card,
  Flex,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { createUploadHistory } from './graphql/mutations';
import { listUploadHistories } from './graphql/queries';


export default function App() {
  const theme = {
    name: 'my-theme',
    tokens: {
      colors: {
        font: {
          primary: { value: '#000000' },
          // ...
        },
      },
    },
  };

  const initialState = { username: 'kalyan', status: 'success' , uploadtime: '08-07-2022 14:37'}

  const [formState, setFormState] = useState(initialState)
  const [histories, setHistories] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  

  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const fileContent = e.target.files[0]
    /*const fileName = e.target.files[0].name*/
    const fileType = e.target.files[0].type

    let ext = fileContent.name.split(".").pop().toLowerCase();
    let fileFormats = ["xlsx", "xls", "csv"];
    if (!fileFormats.includes(ext)) {
        console.log("Invalid file format");
        return false;
    }

    let fileName =
        "data/" +
        fileContent.name.substr(0, fileContent.name.indexOf(ext) - 1) +
        "." +
        ext;

    try {
        setLoading(true);
        // Upload the file to s3 with private access level.
        await Storage.put(fileName, fileContent, {
            contentType: fileType,
            progressCallback(progress) {
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
        })
        setLoading(false);
        Auth.currentUserInfo()
    .then((data) => {
       console.log(data.attributes.email)
    }).catch(err => console.log(err));
    addHistory();
    } catch (err) {
        console.log(err);
    }
}

async function addHistory() {
  try {
    if (!formState.username || !formState.status) return
    const history = { ...formState }
    setFormState(initialState)
    await API.graphql(graphqlOperation(createUploadHistory, {input: history}))
  } catch (err) {
    console.log('error creating history:', err)
  }
}

async function fetchHistory() {
  try {
    const hData = await API.graphql(graphqlOperation(listUploadHistories))
    const histories = hData.data.listUploadHistories.items
    setHistories(histories)
  } catch (err) { console.log('error fetching history') }
}

  return (
    <ThemeProvider theme={theme}>
    <Authenticator hideSignUp={true}>
      {({ signOut}) => (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
      <div className="App">
        <h1> Upload CSV File to S3 </h1>
        {loading ? <h3>Uploading...</h3> : <input
          type="file" accept=".xlsx, .xls, .csv"
          onChange={(evt) => handleChange(evt)}
        />}
      </div>
      <div>
      <h1> Upload History </h1>
      <Flex direction="column">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell as="th">User Name</TableCell>
              <TableCell as="th">Status</TableCell>
              <TableCell as="th">Upload Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              histories.map((history, index) => (
                <TableRow>
                  <TableCell>{history.username}</TableCell>
                  <TableCell>{history.status}</TableCell>
                  <TableCell>{history.uploadtime}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Flex>
      
      </div>
    </View>
    )}
    </Authenticator>
    </ThemeProvider>
  );
}


