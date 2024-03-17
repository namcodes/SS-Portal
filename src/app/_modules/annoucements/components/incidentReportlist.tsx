import { Avatar, Badge, Card, Image, List } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import moment from "moment";

const IncidentReportListComponent = ({ data }: any) => {
  // bodyData, createdAt, createdBy,deletedAt, distros, header,imageLink,incidentHeader,isDraft, status, subHeader, updatedAt,_id

  return (
    <div>
      <Card title="Incidents" extra={<a href="#">More</a>} className="h-full">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 2,
          }}
          dataSource={data}
          footer={
            <div>
              <b></b> {/*change me*/}
            </div>
          }
          renderItem={(incident: any) => (
            <Badge.Ribbon text={incident.status} color="pink">
              <List.Item
                key={incident._id}
                extra={
                  <Image
                    wrapperClassName="w-full md:w-[195px]"
                    alt="logo"
                    src={incident.imageLink ? incident.imageLink : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhIIBwgVCgkXDQoREAwNDRsUChAWIBIWIiAdHx8YHSggGBolGxUfITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgA3wMBIgACEQEDEQH/xAAbAAEBAQADAQEAAAAAAAAAAAAABQcDBAYBAv/EADoQAQABAwADCwoGAwEAAAAAAAABAgMEBQYREhMWFyExVFWRktEiMjQ1UWFzdLKzBxRBQlKBFTNxI//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDYgAAAAAAAAAAAAAAAAAAAAAAAAACQkAAAAAAAAAAAAAAAAAAAAAAAAAAAkJAAAAAAAAAAAAAAAAAAAAAAAAAAAJCQAAAAAAAAAAAAAAAAAAAAAAAAAACQkAAAAAAAAAE3TOladFU29uNXfrrubimi3s3Uzs2/qCkIPCDK6gyO7T4nCDL6gyO7T4gvCDwgy+oMju0+Jwgy+oMju0+ILwg8IMvqDI7tPicIMvqDI7tPiC8IPCDL6gyO7T4nCDK6gyO7T4gvDo6H0jRpXBjKt25t0zVcjcVedExOx3gAAAAAACQkAAAAAAAABB1l9PwfnafoleQdZfT8H52n6JBeAAHHTetVXps03Im5EUzNET5URPNthyA47123Yt75eri3bjnqqnZTD842Vj5VG7xr1N2jm20VRNLxf4nzk73Z3O38r/6bdnm7v9Nv9Jn4cfmf83O9bd43qrfP4+7+9oNNfJ5n18nmBD1L9Rx8bK+5K6hal+o4+NlfcldAAAAAAAJCQAAAAAAAAEHWX0/B+dp+iV5B1l9PwfnafokF553WzWa3oWxvNiYuZsxyU89NEe2fA1s1mtaGsbzYmLmbMclP7aI9s+DK8i/dyb83r9c3LkztmqqfKmQdvE0vm4ukv8hbvzORuttVVU7d37Yn3NV1e05jabw99tTuLscly1M+VTPgxx29GaQydGZkZWJXuLkTzftqj2T7gbVes28i3vd+3Fy3PPTXG2mXFbtYejceardujGsxG6qmmmKaY98uhoTWHD0ro+crdxaqpp23aKp8z3/8eD1u1nr0xd/LYtU0YUTyRzVXJ9s+73A93oTWTA0zfrsY9W5uUzVspr5N8p/lCxPMwvHv3ca/F6xXNu5E7YqpnyolqequstvTVjer0xbzKaeWj9tce2PAHLqX6jj42V9yV1C1L9RR8XK+5K6AAAAAAASEgAAAAAAAAPJ/iBlXMHHx8qz/ALKciqY2x5O3cS9Yk6w6Es6cx6bN+7VbimvdRNERy8mz9QZBkX7uTfm9frm5cmds1VTtqmXG0bi8wem3Oyk4vMHptzspBnI0bi8wem3Oyk4vMHptzspBnUV1UxMU1bImNkxE88PjRuLzB6bc7KTi8wem3OykGcuTHv3Ma9F6xXNu5E7YqpnZVEtC4vMHptzspOLzB6bc7KQU9RK5r1bt11ctU3MiZ78vQOjoXRtvROj6cO1XNyiJqmKqvO5Z2u8AAAAAAASEgAAAAAAAAAAAAAAAAAAAAAAAAAAEhIAAAAAAAAAAAAAAAAAAAAAAAAAABISAAAAAAAAAAAAAAAAAAAAAAAAAAASEgAAAAAAAAAAAAAAAAAAAAAAAAAAEhIAAAAAAAAAAAAAAAAAAAAAAAAAABIA//9k="}
                    preview={true}
                  />
                }
              >
                <List.Item.Meta
                  title={<Link href={"/"}>{incident.header}</Link>}
                  description={incident.subHeader}
                />
                <div>Posted {moment(incident.createdAt).calendar()}</div>
                <div>Posted By: {incident.createdBy}</div>
              </List.Item>
            </Badge.Ribbon>
          )}
        />
      </Card>
    </div>
  );
};

export default IncidentReportListComponent;
